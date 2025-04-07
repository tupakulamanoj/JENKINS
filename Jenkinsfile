pipeline {
    agent any

    stages {
        stage('Deploy to Slave 1') {
            agent { label 'slave1' }
            steps {
                sh '''
                    echo "Deploying on Slave 1 machine..."
                    sudo cp -r * /var/www/html/
                    sudo systemctl restart httpd || sudo systemctl restart apache2
                '''
            }
        }

        stage('Deploy to Slave 2') {
            agent { label 'slave2' }
            steps {
                sh '''
                    echo "Deploying on Slave 2 machine..."
                    sudo cp -r * /var/www/html/
                    sudo systemctl restart httpd || sudo systemctl restart apache2
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
