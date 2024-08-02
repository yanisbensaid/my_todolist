cd ../

echo ""
echo -e "\033[92mEnter the password for the root user of MySQL\033[0m"
echo ""
cat epytodo.sql | sudo mysql -u root -p
echo ""

echo -e "\033[92mShow the tables of the database epytodo\033[0m"
echo ""
echo "USE epytodo; SHOW TABLES;" | sudo mysql -u root -p
echo ""
