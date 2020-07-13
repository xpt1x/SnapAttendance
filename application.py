from flask import Flask, render_template, request, jsonify
from uims_api import SessionUIMS
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api', methods=['POST'])
def get_data():
    try:
        uid = request.form.get('uid')
        password = request.form.get('password')
    except:
        uid = password = None

    my_acc = SessionUIMS(uid, password)
    try:
        response = my_acc.attendance
    except:
        return jsonify({'error': 'Invalid credentials'})
    return jsonify(response)