#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> dict[int, List]:
        """Dataset indexed by sorting position, starting at 0"""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {i: dataset[i] for i in range(len(dataset))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> dict:
        '''"""
        return info page
        p_ info : is bage info
        c_info : is count the data
        n_ind : is the next index
        """
        info = self.indexed_dataset()
        assert index is not None and index >= 0 and page_size > 0
        begin = index or 0
        c_info = 0
        n_ind = None
        p_info = []
        while len(p_info) < page_size:
            if begin in info:
                p_info.append(info[begin])
                begin += 1

        n_ind = index + page_size

        re_info = {
            "index": index,
            "next_index": n_ind,
            "page_size": len(p_info),
            "data": p_info,
        }
        return re_info'''
              assert index is not None and index >= 0, "Index must be non-negative and not None."
        assert page_size > 0, "Page size must be positive."

        dataset = self.indexed_dataset()
        data = []
        current_index = index
        
        while len(data) < page_size:
            if current_index in dataset:
                data.append(dataset[current_index])
            current_index += 1
        
        next_index = index + page_size
        
        return {
            'index': index,
            'next_index': next_index,
            'page_size': page_size,
            'data': data
        }
