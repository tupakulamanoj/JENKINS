pipeline {
    agent any

    stages {
        stage('Deploy to Slave 1') {
            agent { label 'slave1' }
            steps {
                checkout scm
                withEnv(["PATH+EXTRA=/usr/sbin:/sbin"]) {
                    sh '''
                    echo 'Deploying on Slave 1 machine...'

                    # Create directory if it doesn't exist
                    sudo mkdir -p /var/www/html

                    # Check if httpd or apache2 is installed
                    if ! systemctl list-units --type=service | grep -q -e httpd -e apache2; then
                      echo "Web server not found! Installing httpd..."
                      sudo yum install -y httpd || sudo apt-get install -y apache2
                      sudo systemctl start httpd || sudo systemctl start apache2
                      sudo systemctl enable httpd || sudo systemctl enable apache2
                    else
                      echo "Web server already installed."
                    fi

                    # Copy all files from workspace to /var/www/html
                    sudo cp -r . /var/www/html/
                    '''
                }
            }
        }

        stage('Deploy to Slave 2') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            agent { label 'Slave2' }
            steps {
                withEnv(["PATH+EXTRA=/usr/sbin:/sbin"]) {
                    sh '''
                    echo 'Deploying on Slave 2 machine...'

                    # Create directory if it doesn't exist
                    sudo mkdir -p /var/www/html

                    # Check if httpd or apache2 is installed
                    if ! systemctl list-units --type=service | grep -q -e httpd -e apache2; then
                      echo "Web server not found! Installing httpd..."
                      sudo yum install -y httpd || sudo apt-get install -y apache2
                      sudo systemctl start httpd || sudo systemctl start apache2
                      sudo systemctl enable httpd || sudo systemctl enable apache2
                    else
                      echo "Web server already installed."
                    fi

                    # Copy all files from workspace to /var/www/html
                    sudo cp -r . /var/www/html/
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment succeeded!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
