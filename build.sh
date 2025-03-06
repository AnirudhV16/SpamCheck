#!/usr/bin/env bash 
#Exit on ۱۲۳۵۳ 
set -o errexit 
#Modify this line as needed for your package manager (pip, poetry, etc.1 
pip install -r requirements.txt 
#Convert static asset files 
python manage.py collectstatic --no-input 
#Apply any outstanding database migrations 
python manage.py migrate