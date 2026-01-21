pipeline {
agent any

```
environment {
    DOCKER_COMPOSE = "docker compose"
}

stages {

    stage('Checkout Code') {
        steps {
            git branch: 'main',
                url: 'https://github.com/khudabox144/devops-learning.git'
        }
    }

    stage('Install Dependencies') {
        steps {
            sh '''
                echo "Installing dependencies for services..."
                cd backend/user-service && npm install
                cd ../auth-service && npm install
                cd ../payment-service && npm install
            '''
        }
    }

    stage('Build Docker Images') {
        steps {
            sh '''
                echo "Building Docker images..."
                docker compose build
            '''
        }
    }

    stage('Run Docker Compose') {
        steps {
            sh '''
                echo "Starting services..."
                docker compose up -d
            '''
        }
    }
}

post {
    always {
        echo "Stopping containers..."
        sh '''
            docker compose down || true
        '''
    }
}
```

}
