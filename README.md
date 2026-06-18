# 🚀 End-to-End DevOps & DevSecOps Todo Application on AWS EKS

## 📌 Project Overview

This project demonstrates a complete end-to-end DevOps and DevSecOps implementation by deploying a containerized Todo Application on Amazon EKS using Infrastructure as Code, GitOps, Monitoring, Alerting, Security Scanning, and Kubernetes best practices.

The project automates infrastructure provisioning, application deployment, monitoring, alerting, scaling, and security validation while following modern cloud-native deployment practices.

---

# 🏗️ Solution Architecture

```text
Developer
    │
    ▼
 GitHub Repository
    │
    ▼
 GitHub Actions / CI Pipeline
    │
    ├── OWASP Dependency Check
    ├── Trivy Security Scan
    ├── Docker Build
    └── Push Images to ECR
    │
    ▼
 ArgoCD (GitOps)
    │
    ▼
 Amazon EKS
    │
    ├── Frontend (React)
    ├── Backend (Node.js)
    └── Kubernetes Services
    │
    ▼
 DynamoDB
```

Monitoring Flow

```text
Application
     │
     ▼
 Prometheus
     │
     ▼
 Grafana
     │
     ▼
 Alertmanager
     │
     ▼
 Gmail Notifications
```

---

# 🎯 Project Objectives

* Implement Infrastructure as Code using Terraform
* Deploy Kubernetes workloads on Amazon EKS
* Implement GitOps using ArgoCD
* Monitor workloads using Prometheus and Grafana
* Configure automated alerting using Alertmanager
* Perform vulnerability scanning using Trivy
* Perform dependency security checks using OWASP Dependency Check
* Implement Horizontal Pod Autoscaling
* Use remote Terraform state management
* Demonstrate modern DevOps and DevSecOps practices

---

# 🛠️ Technology Stack

## Cloud Platform

* AWS EKS
* AWS ECR
* AWS DynamoDB
* AWS S3
* AWS IAM
* AWS VPC

## Infrastructure as Code

* Terraform

## Containerization

* Docker

## Container Orchestration

* Kubernetes

## GitOps

* ArgoCD

## Monitoring

* Prometheus
* Grafana
* Alertmanager

## DevSecOps

* Trivy
* OWASP Dependency Check

## Configuration Management

* Ansible

## Source Control

* GitHub

---

# 📁 Application Components

## Frontend

Technology:

* React.js

Responsibilities:

* User Interface
* Todo Management
* API Communication

Containerized using Docker and deployed on Kubernetes.

---

## Backend

Technology:

* Node.js
* Express.js

Responsibilities:

* REST APIs
* Business Logic
* DynamoDB Integration
* Health Checks
* Metrics Exposure

Endpoints:

```text
/
```

```text
/health
```

```text
/metrics
```

---

## Database

Technology:

* AWS DynamoDB

Benefits:

* Fully Managed
* Highly Available
* No Server Management
* Automatic Scaling

---

# ☁️ Infrastructure Provisioning

All infrastructure is provisioned using Terraform.

Terraform provisions:

* VPC
* Public Subnets
* Internet Gateway
* Route Tables
* EKS Cluster
* Managed Node Groups
* ECR Repositories
* DynamoDB Table
* IAM Roles
* Security Groups

---

# 🔒 Terraform Remote State Management

Terraform State Storage:

### AWS S3

Used for:

* Terraform State Storage
* Team Collaboration
* Backup and Recovery

### DynamoDB

Used for:

* Terraform State Locking
* Prevent Concurrent Terraform Changes

Benefits:

* Safe Team Collaboration
* Consistent Infrastructure State
* Reduced Risk of State Corruption

---

# 🐳 Containerization

Docker is used to package:

* Frontend Application
* Backend Application

Benefits:

* Consistent Runtime Environment
* Portability
* Easy Deployment
* Simplified Dependency Management

---

# ☸ Kubernetes Deployment

The application is deployed using Kubernetes resources:

* Namespace
* Deployment
* Service
* ConfigMap
* Secret
* Ingress
* Horizontal Pod Autoscaler

---

# 🚀 GitOps Implementation

ArgoCD is used to implement GitOps.

Workflow:

```text
Developer Pushes Code
        │
        ▼
GitHub Repository Updated
        │
        ▼
ArgoCD Detects Change
        │
        ▼
Automatic Synchronization
        │
        ▼
Application Updated on EKS
```

Benefits:

* Declarative Deployments
* Version Controlled Infrastructure
* Easy Rollback
* Automated Synchronization

---

# 📈 Monitoring

Prometheus is used for:

* Kubernetes Monitoring
* Application Monitoring
* Resource Monitoring

Metrics Collected:

* CPU Usage
* Memory Usage
* Pod Status
* Deployment Health
* Application Metrics

---

# 📊 Grafana Dashboards

Grafana visualizes:

* Cluster Health
* Node Metrics
* Pod Metrics
* CPU Utilization
* Memory Utilization
* Application Metrics

Benefits:

* Real-Time Visibility
* Performance Monitoring
* Capacity Planning

---

# 📧 Alerting

Alertmanager is configured with Gmail SMTP notifications.

Custom Alerts:

### BackendDeploymentDown

Triggered when:

```text
Backend replicas < 1
```

### FrontendDeploymentDown

Triggered when:

```text
Frontend replicas < 1
```

### High CPU Usage

Triggered when:

```text
CPU usage exceeds threshold
```

### High Memory Usage

Triggered when:

```text
Memory usage exceeds threshold
```

Email notifications are automatically sent to administrators.

---

# 🔐 DevSecOps Implementation

Security scanning is integrated into the CI/CD workflow.

## Trivy

Used for:

* Docker Image Scanning
* Vulnerability Detection
* Container Security Validation

Benefits:

* Detects Known Vulnerabilities
* Improves Container Security
* Supports Shift-Left Security

---

## OWASP Dependency Check

Used for:

* Dependency Analysis
* CVE Detection
* Security Validation

Benefits:

* Detects Vulnerable Libraries
* Reduces Supply Chain Risk
* Improves Application Security

---

# ⚡ Auto Scaling

Horizontal Pod Autoscaler (HPA) is configured for:

## Frontend

Automatically scales pods based on resource utilization.

## Backend

Automatically scales pods based on resource utilization.

Benefits:

* Improved Availability
* Better Resource Utilization
* Cost Efficiency

---

# ⚙️ Ansible

Ansible is included for configuration management and automation.

Potential automation tasks:

* Docker Installation
* Kubernetes Tools Installation
* Monitoring Stack Deployment
* Application Deployment Automation
* Server Configuration Management

---

# 🔐 Security Features

* Kubernetes Secrets
* AWS IAM Roles
* Terraform State Locking
* Container Vulnerability Scanning
* Dependency Vulnerability Scanning
* Secure Configuration Management

---

# 🎯 Key DevOps Concepts Demonstrated

* Infrastructure as Code (Terraform)
* Kubernetes Orchestration
* GitOps
* Monitoring & Observability
* Alerting
* Containerization
* DevSecOps
* Vulnerability Management
* Configuration Management
* Auto Scaling
* Cloud-Native Deployments
* Remote State Management

---

# 🚀 Future Enhancements

The following production-grade improvements can be implemented:

### Networking

* Private Worker Nodes
* NAT Gateway
* Internet Gateway Based Routing
* Multi-AZ Production Networking

### Security

* IAM Roles for Service Accounts (IRSA)
* Bastion Host
* Network Policies

### Scaling

* Cluster Autoscaler
* Karpenter
* Spot Instances

### DNS & SSL

* Route53
* ACM SSL Certificates
* HTTPS Ingress

### Deployment Strategies

* Blue-Green Deployment
* Canary Deployment

---

# 🏆 Project Highlights

✅ AWS EKS

✅ Terraform

✅ Docker

✅ Kubernetes

✅ ArgoCD

✅ Prometheus

✅ Grafana

✅ Alertmanager

✅ Trivy

✅ OWASP Dependency Check

✅ Horizontal Pod Autoscaling

✅ DynamoDB

✅ S3 Remote Backend

✅ DynamoDB State Locking

✅ Ansible

✅ GitOps

✅ DevSecOps

---

# 👨‍💻 Author

**Gaffar Abubakar Khan**

DevOps Engineer | Cloud Enthusiast | Kubernetes | AWS

---

# 📌 Project Outcome

This project successfully demonstrates a complete end-to-end DevOps and DevSecOps workflow using AWS, Terraform, Docker, Kubernetes, GitOps, Monitoring, Alerting, Security Scanning, and Automation tools while following modern cloud-native deployment best practices.
