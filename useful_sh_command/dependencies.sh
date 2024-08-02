cd ../

echo -e "\033[92mINSTALL EVERY DEPENDENCIES NEEDED\033[0m"
echo ""

echo -e "\033[92mInstall npm\033[0m"
sudo apt-get install -y npm
echo ""

echo -e "\033[92mInstall Node.js\033[0m"
sudo apt-get install -y nodejs
echo ""

echo -e "\033[92mInstall dotenv\033[0m"
npm install dotenv --save
echo ""

echo -e "\033[92mInstall MariaDB\033[0m"
sudo apt-get install -y mariadb-server
echo ""

echo -e "\033[92mInstall MySQL\033[0m"
sudo apt-get install -y mysql-server
echo ""

echo -e "\033[92mInstall Express\033[0m"
npm install express --save
echo ""

echo -e "\033[92mInstall mysql2\033[0m"
npm install mysql2 --save
echo ""

echo -e "\033[92mInstall jsonwebtoken\033[0m"
npm install jsonwebtoken --save
echo ""

echo -e "\033[92mInstall bcryptjs\033[0m"
npm install bcryptjs --save
echo ""

echo -e "\033[92mInstall body-parser\033[0m"
npm install body-parser --save
echo ""
