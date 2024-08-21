#!/usr/bin/python3

""" Task 0 """

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """base_cash function"""

    def put(self, key, item):
        """send function"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """reseved function"""
        return self.cache_data.get(key, None)
