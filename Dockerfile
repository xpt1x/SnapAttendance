# The Dockerfile defines the image's environment
# Import Python runtime and set up working directory
FROM python:3.6
WORKDIR /SnapAttendance
ADD . /SnapAttendance

# Install any necessary dependencies
RUN pip install -r requirements.txt
RUN pip install -e .

# Open port 80 for serving the webpage
EXPOSE 80

# Run gunicorn server
CMD ["gunicorn"  , "-b", "0.0.0.0:80", "application:app"]



