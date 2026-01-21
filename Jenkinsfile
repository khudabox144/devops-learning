pipeline {
    agent any

    environment {
        DOCKER_IMAGE_USER = "your-dockerhub-username/user-service"
        DOCKER_IMAGE_POST = "your-dockerhub-username/post-service"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/khudabox144/devops-learning.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd backend/user-service && npm install'
                sh 'cd backend/post-service && npm install'
                sh 'cd next-app && npm install'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_USER backend/user-service'
                sh 'docker build -t $DOCKER_IMAGE_POST backend/post-service'
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'docker compose down'
        }
    }
}
