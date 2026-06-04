terraform {
  backend "s3" {
    bucket         = "gaffar-terraform-state-2026"
    key            = "eks/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}