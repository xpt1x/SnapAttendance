from flask import Flask, render_template, request, jsonify
from uims_api import SessionUIMS
from uims_api.exceptions import IncorrectCredentialsError
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

    my_acc = SessionUIMS(request.form.get('uid'), request.form.get('password'))
    try:
        subjects = my_acc.attendance
    except:
        return jsonify({'error': 'Invalid creds'})
    else:
        return jsonify(subjects)
