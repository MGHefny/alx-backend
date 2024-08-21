#!/usr/bin/python3
"""Task 0"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """basw_cash class"""

    def put(self, key, item):
        """Puts item in cache"""
        if key is not None and item is not None:
            return
            self.cache_data[key] = item

    def get(self, key):
        """cashed"""
        return self.cache_data.get(key, None)
