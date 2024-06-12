FROM python:3.9
WORKDIR /app
COPY . .

# ONLY IF WE ARE BEHIND A PROXY
ENV http_proxy host:port
ENV https_proxy host: port


RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
