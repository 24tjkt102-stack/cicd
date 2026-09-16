import os
import datetime
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({
        "skenario": 2,
        "level": 3,
        "stack": "Python Flask + gunicorn (self-hosted runner VM-B)",
        "branch_target": os.environ.get("DEPLOY_BRANCH", "unknown"),
        "pesan": "Dideploy langsung di VM-B saat push ke main/staging, atau lewat jadwal cron mingguan.",
        "waktu": datetime.datetime.utcnow().isoformat() + "Z"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100)
