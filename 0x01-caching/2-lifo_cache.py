#!/usr/bin/env python3
""" Function Task 2
"""
from base_caching import BaseCaching
from collections import OrderedDict


class LIFOCache(BaseCaching):
    """
    Lifo function cashed
    """

    def __init__(self):
        """
        init function
        """
        self.dic_ordr = OrderedDict()
        super().__init__()

    def put(self, key, item):
        """
        data post function to cashed item
        """
        if key is None or item is None:
            pass
        else:
            data_len = len(self.cache_data)
            if data_len >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print("DISCARD: {}".format(self.dic_ordr[-1]))
                del self.cache_data[self.dic_ordr[-1]]
                del self.dic_ordr[-1]
            if key in self.dic_ordr:
                del self.dic_ordr[self.dic_ordr.index(key)]
            self.dic_ordr.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """function to reseve data"""
        if key is not None:
            return self.cache_data.get(key, None)
        return None
