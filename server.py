import http.server
import socketserver
import os

# Настройка порта
PORT = 8000

# Настройка обработчика
Handler = http.server.SimpleHTTPRequestHandler

# Получение текущей директории
current_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(current_dir)

# Запуск сервера
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Сервер запущен на порту {PORT}")
    print(f"Откройте браузер и перейдите по адресу: http://localhost:{PORT}")
    httpd.serve_forever()
