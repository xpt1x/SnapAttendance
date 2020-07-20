# Snap Attendance [View App](https://snapatd.tech)

Snap Attendance is the new quick way for Chandigarh University's students for fetching their attendance, which shows their attendance of various subjects straight out of the box and also saves users from painful logins again and again. Also there are fields which are auto calculated to let you know, how many lectures are more required according to university's standard and saves you from getting DEBAR.

App is built with REACT Framework and has a beautiful, minimal UI to save user from clutter  
Snap attendance is also available natively to install on any device like Android / ios / desktop

## Contribution

If you want to help this project, then you just have to use and report problems you faced  
Contributions are most welcome!

## Building

**Npm, Python3** is required

```bash
$ git clone https://github.com/xpt1x/SnapAttendance.git
$ cd SnapAttendance
# building backend
# install required pip modules
$ pip install -r requirements.txt
# install local api module
$ pip install -e .
# building frontend
$ cd frontend
$ npm install
$ npm run build
# running server
$ cd ..
$ export FLASK_APP=application.py
$ flask run
```

## Credits

This project is powered by `UIMS-API`provided by **Ritiek Malhotra**
