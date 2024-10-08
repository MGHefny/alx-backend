#!/usr/bin/env python3
"""
function Task 1
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    fifo cached function
    """

    def __init__(self):
        """
        init function
        """
        self.dic_ordr = []
        super().__init__()

    def put(self, key, item):
        """
        data post function to cashed item
        """
        if key is None or item is None:
            pass
        else:
            da_len = len(self.cache_data)
            if da_len >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print("DISCARD: {}".format(self.dic_ordr[0]))
                del self.cache_data[self.dic_ordr[0]]
                del self.dic_ordr[0]
            self.dic_ordr.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """
        data reseved function from cashed
        """
        if key is not None:
            return self.cache_data.get(key, None)
        return None
