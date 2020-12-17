

eval `ssh-agent`
echo "start sDesign ShellScript"
echo "start git pull"
pwd
if ! (git pull) then
    echo "Git pull 실패"
    exit 1
else
echo "complete update codes And restart pm2 Cluster."
pm2 restart 0
echo "complete restart pm2 cluster."
eval `ssh-agent -k`
fi