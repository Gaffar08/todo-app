#########################################################
# GET EKS OIDC CERTIFICATE
#########################################################

data "tls_certificate" "eks" {
  url = aws_eks_cluster.eks.identity[0].oidc[0].issuer
}

#########################################################
# CREATE OIDC PROVIDER
#########################################################

resource "aws_iam_openid_connect_provider" "eks" {

  url = aws_eks_cluster.eks.identity[0].oidc[0].issuer

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    data.tls_certificate.eks.certificates[0].sha1_fingerprint
  ]
}

#########################################################
# DYNAMODB POLICY
#########################################################

resource "aws_iam_policy" "backend_dynamodb_policy" {

  name = "todo-backend-dynamodb-policy"

  policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Action = [

          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query"

        ]

        Resource = "arn:aws:dynamodb:ap-south-1:632321138060:table/todos"

      }

    ]

  })

}

#########################################################
# IRSA ROLE
#########################################################

resource "aws_iam_role" "backend_irsa_role" {

  name = "todo-backend-irsa-role"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Principal = {

          Federated = aws_iam_openid_connect_provider.eks.arn

        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {

          StringEquals = {

            "${replace(
              aws_eks_cluster.eks.identity[0].oidc[0].issuer,
              "https://",
              ""
            )}:sub" = "system:serviceaccount:todo-app:backend-sa"

          }

        }

      }

    ]

  })

}

#########################################################
# ATTACH POLICY TO ROLE
#########################################################

resource "aws_iam_role_policy_attachment" "backend_attachment" {

  role = aws_iam_role.backend_irsa_role.name

  policy_arn = aws_iam_policy.backend_dynamodb_policy.arn

}