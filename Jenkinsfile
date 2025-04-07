pipeline {
    agent any

    environment {
        DEPLOY_DIR = "/var/www/html"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Apache') {
            steps {
                sshagent (credentials: ['e3d7b74b-d50e-42cd-aa18-7b7b49d6f428']) {
                    sh '''
                        echo "Deploying files to Apache directory..."
                        sudo cp -r * ${DEPLOY_DIR}
                        sudo systemctl restart httpd || sudo systemctl restart apache2
                    '''
                }
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
