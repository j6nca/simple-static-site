terraform {
  required_version = "1.1.7"
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "jng-remote-state"
    dynamodb_table = "jng-remote-state-lock"
    key    = "simple-static-site/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}
