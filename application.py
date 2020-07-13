from flask import Flask, render_template, request, jsonify
from uims_api import SessionUIMS
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api', methods=['POST'])
def get_data():
    
    if not request.form.get('uid'):
        return jsonify({'error': 'UID not provided'})
    if not request.form.get('password'):
        return jsonify({'error': 'password not provided'})

    try:
        my_acc = SessionUIMS(request.form.get('uid'), request.form.get('password'))      
    except:
        return jsonify({'error': 'Invalid credentials'})
    response = my_acc.attendance
    return jsonify(response)