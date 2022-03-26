module "my-site" {
    source = "../../tf-modules/static-site"

    hosted_zone_id = "Z0889591OHZG9Q5EXENE"
    domain_name = "jng.sh"
    origin_id = "S3Origin"
    certificate_arn = "arn:aws:acm:us-east-1:339471875137:certificate/78dccafe-2ad0-4f1f-bd03-3a2773c98bc9"
    # certificate_arn = "arn:aws:acm:us-east-1:339471875137:certificate/4183de4d-591d-467b-a057-62d3a68677d0"
    # certificate_arn = "arn:aws:acm:us-east-1:339471875137:certificate/26eb2e7c-f442-4459-b905-d1c50d2cb136"
}