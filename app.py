"""
Dilana Damsath — Portfolio backend

Serves the static site and saves contact-form submissions to contacts.csv.

Run:
    pip install -r requirements.txt
    python app.py

Then open http://127.0.0.1:5000
"""

import csv
import os
import re
from datetime import datetime, timezone

from flask import Flask, request, jsonify, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "contacts.csv")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")


def ensure_csv_exists():
    if not os.path.exists(CSV_PATH):
        with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["timestamp", "email", "message"])


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not email or not message:
        return jsonify({"ok": False, "error": "Email and message are required."}), 400

    if not EMAIL_RE.match(email):
        return jsonify({"ok": False, "error": "That email address doesn't look valid."}), 400

    if len(message) > 5000:
        return jsonify({"ok": False, "error": "Message is too long."}), 400

    ensure_csv_exists()

    with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([datetime.now(timezone.utc).isoformat(), email, message])

    return jsonify({"ok": True}), 200


if __name__ == "__main__":
    ensure_csv_exists()
    app.run(debug=True, port=5000)
