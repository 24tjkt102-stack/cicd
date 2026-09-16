import os
import datetime
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({
        "skenario": 1,
        "level": 3,
        "stack": "Python Flask + gunicorn (systemd)",
        "versi_release": os.environ.get("APP_VERSION", "dev"),
        "pesan": "Dideploy hanya saat tag v* dibuat (release) atau lewat jadwal cron harian.",
        "waktu": datetime.datetime.utcnow().isoformat() + "Z"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
