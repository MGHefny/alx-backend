'''#!/usr/bin/python3


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """base_cash function"""

    def __init__(self):
        """the super call"""
        super().__init__()

    def put(self, key, item):
        """send function"""
        if key is None or item is None:
            self.cache_data[key] = item

    def get(self, key):
        """reseved function"""
        if key not in None:
            return self.cache_data[key]
        return None'''


#!/usr/bin/python3

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """BasicCache"""

    def __init__(self):
        """BasicCache"""
        super().__init__()

    def put(self, key, item):
        """
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        """
        if key is not None:
            return self.cache_data.get(key, None)
        return None
