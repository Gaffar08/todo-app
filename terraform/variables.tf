variable "aws_region" {
  default = "ap-south-1"
}

variable "cluster_name" {
  default = "todo-eks-cluster"
}

variable "gmail_app_password" {
  type      = string
  sensitive = true
}

variable "grafana_admin_password" {
  type      = string
  sensitive = true
}

variable "app_aws_access_key_id" {
  type      = string
  sensitive = true
}

variable "app_aws_secret_access_key" {
  type      = string
  sensitive = true
}