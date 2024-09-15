# Set up the Python environment
FROM python:3.12 AS python-base
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Set up Node.js environment
FROM node:20 AS node-base
WORKDIR /app

# Copy the frontend code
COPY package*.json ./
RUN npm install
COPY . .

# Combine Python and Node.js
FROM python-base
WORKDIR /app

# Copy Node.js files and set up environment
COPY --from=node-base /app /app
COPY --from=node-base /usr/local/bin/node /usr/local/bin/
COPY --from=node-base /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -s /usr/local/bin/node /usr/bin/node && \
    ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/bin/npm

# Copy the backend code
COPY app ./app

# Set up a non-root user
RUN useradd -m -u 1000 appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose the ports the apps run on
EXPOSE 3000 8000

# Start both the FastAPI backend and Next.js frontend in development mode.
CMD ["sh", "-c", "npm run dev & uvicorn app.api.main:app --host 0.0.0.0 --port 8000"]
