# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.10.0"
    }
  }
  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "gadeTF"
  location = "Southeast Asia"
}

resource "azurerm_kubernetes_cluster" "gade-kube" {
  name                = "gade-kube"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "gadekube"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "standard_b2s"
  }
  identity {
    type = "SystemAssigned"
  }
  sku_tier = "Free"

}
