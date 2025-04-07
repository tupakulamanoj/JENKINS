pipeline {
    agent any

    stages {
        stage('Deploy to Slave 1') {
            agent { label 'slave1' }
            steps {
                sh '''
                    echo "Deploying on Slave 1 machine..."
                    # Ensure /var/www/html exists
                    sudo mkdir -p /var/www/html
                    # Copy files safely
                    sudo cp -r * /var/www/html/
                    # Restart web server
                    if systemctl list-units --type=service | grep -q httpd; then
                        sudo systemctl restart httpd
                    elif systemctl list-units --type=service | grep -q apache2; then
                        sudo systemctl restart apache2
                    else
                        echo "Web server not found!"
                        exit 1
                    fi
                '''
            }
        }

        stage('Deploy to Slave 2') {
            agent { label 'slave2' }
            steps {
                sh '''
                    echo "Deploying on Slave 2 machine..."
                    sudo mkdir -p /var/www/html
                    sudo cp -r * /var/www/html/
                    if systemctl list-units --type=service | grep -q httpd; then
                        sudo systemctl restart httpd
                    elif systemctl list-units --type=service | grep -q apache2; then
                        sudo systemctl restart apache2
                    else
                        echo "Web server not found!"
                        exit 1
                    fi
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
