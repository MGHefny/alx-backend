#!/usr/bin/python3
""" BasicCache module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ Basic Cache Class """

    def _init_(self):
        super()._init_()

    def put(self, key, item):
        """ Add key, Item to cache.data """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """ get item of key from cache.data """
        if key not in self.cache_data:
            return None
        return self.cache_data[key]
"""
#!/usr/bin/python3

""" Task 0 """

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """base_cash function"""
    def __init__(self):
        """the super call"""
        super().__init__()

    def put(self, key, item):
        """ send function """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """reseved function"""
        if key not in self.cache_data:
            return None
        return self.cache_data[key]"""
        