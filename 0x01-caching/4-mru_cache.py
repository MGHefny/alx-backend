#!/usr/bin/env python3
"""BaseCaching Task 4"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """FIFO Cache function"""

    def __init__(self):
        """Init function"""
        self.dic_ordr = []
        super().__init__()

    def put(self, key, item):
        """data post function to cashed item"""
        if key is None or item is None:
            return None
        else:
            da_len = len(self.cache_data)
            if da_len >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print("DISCARD: {}".format(self.dic_ordr[-1]))
                del self.cache_data[self.dic_ordr[-1]]
                del self.dic_ordr[-1]
            if key in self.dic_ordr:
                del self.dic_ordr[self.dic_ordr.index(key)]
            self.dic_ordr.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """function to reseve data or None"""
        if key is not None and key in self.cache_data.keys():
            del self.dic_ordr[self.dic_ordr.index(key)]
            self.dic_ordr.append(key)
            return self.cache_data[key]
        return None
