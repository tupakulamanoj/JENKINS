pipeline {
    agent any

    environment {
        DEPLOY_DIR = "/var/www/html"
        SERVER_USER = "ec2-user"
        REMOTE_DIR = "/home/ec2-user"
        NODE1_PUBLIC_IP = "98.81.79.144"
        NODE2_PUBLIC_IP = "98.84.116.212"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Slave 1') {
            steps {
                sshagent (credentials: ['0ed1c13e-b8c6-4d4c-9995-2c0122dd178a']) {
                    sh '''
                        echo "Deploying to Slave 1 (98.81.79.144)..."
                        scp -o StrictHostKeyChecking=no -r * ${SERVER_USER}@${NODE1_PUBLIC_IP}:${REMOTE_DIR}/

                        ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${NODE1_PUBLIC_IP} '
                            sudo cp -r ${REMOTE_DIR}/* ${DEPLOY_DIR} &&
                            sudo systemctl restart httpd || sudo systemctl restart apache2
                        '
                    '''
                }
            }
        }

        stage('Deploy to Slave 2') {
            steps {
                sshagent (credentials: ['0ed1c13e-b8c6-4d4c-9995-2c0122dd178a']) {
                    sh '''
                        echo "Deploying to Slave 2 (98.84.116.212)..."
                        scp -o StrictHostKeyChecking=no -r * ${SERVER_USER}@${NODE2_PUBLIC_IP}:${REMOTE_DIR}/

                        ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${NODE2_PUBLIC_IP} '
                            sudo cp -r ${REMOTE_DIR}/* ${DEPLOY_DIR} &&
                            sudo systemctl restart httpd || sudo systemctl restart apache2
                        '
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful on both slaves!"
        }
        failure {
            echo "❌ Deployment failed on one or both slaves!"
        }
    }
}
