#!/bin/sh
/opt/boxen/homebrew/Cellar/mysql/5.5.20-boxen2/bin/mysqladmin -u root -f drop chatterboxdb
/opt/boxen/homebrew/Cellar/mysql/5.5.20-boxen2/bin/mysqladmin -u root create chatterBoxDB
/opt/boxen/homebrew/Cellar/mysql/5.5.20-boxen2/bin/mysql -u root chatterBoxDB < /Users/hackreactor/code/josephtoney/2013-11-databases/test.sql
