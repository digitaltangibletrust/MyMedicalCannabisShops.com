# MyMedicalCannabisShops.com
MyMedicalCannabisShops.com website

# getting started
```
npm install && bower install
```
After creating a postgres username with test:test credentials

```
postgres=# create database mycannabisshops;
CREATE DATABASE
postgres=# grant all on database mycannabisshops to test;
GRANT
postgres=# 
```
then
```
grunt migrate:up && grunt
```