#!/usr/bin/python3

"""htis task 0"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """BasicCach function"""

    def __init__(self):
        """init function"""
        super().__init__()

    def put(self, key, item):
        """function to send data"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """function to reseve data"""
        if key is not None:
            return self.cache_data.get(key, None)
        return None
