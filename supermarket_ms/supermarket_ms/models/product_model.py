from django.db import models
from .category_model import Category

class Product(models.Model):

    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 140)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    unit_measurement = models.CharField(max_length = 2)
    quantity = models.IntegerField()
    precio_unitario =  models.FloatField()

    class Meta:
        app_label = 'supermarket_ms'
