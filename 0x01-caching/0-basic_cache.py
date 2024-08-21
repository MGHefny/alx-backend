#!/usr/bin/python3
"""Task 0"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """basw_cash class"""

        def __init__(self):
        """init fun base"""
        BaseCaching.__init__(self)


    def put(self, key, item):
        """Puts item in cache"""
        if key is not None and item is not None:
            return
            self.cache_data[key] = item

    def get(self, key):
        """cashed"""
        if key is not None and key in self.cache_data.keys():
            return self.cache_data[key]
        return None