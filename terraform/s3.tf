resource "aws_s3_bucket" "static-site-bucket" {
  bucket = var.domain_name
  acl    = "public-read"
  policy = templatefile("policies/s3_policy.json.tpl", { bucket = var.domain_name })

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
