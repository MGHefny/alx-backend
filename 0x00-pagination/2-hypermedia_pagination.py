#!/usr/bin/env python3
"""help function"""
import csv
import math
from typing import List


def index_range(page, page_size):
    """return range"""
    front = (page - 1) * page_size
    last = page * page_size
    return front, last


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """info pages"""
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0
        front, last = index_range(page, page_size)
        info = self.dataset()
        if front > len(info):
            return []
        return info[front:last]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """hyper data"""
        all_page = len(self.dataset() / page_size)
        info = self.get_page(page, page_size)
        task_data = {
            "page_size": page_size if page_size <= len(info) else len(info),
            "page": page,
            "data": info,
            "prev_page": page - 1 if page > 1 else None,
            "next_page": page + 1 if page + 1 <= all_page else None,
            "total_pages": all_page,
        }
        return task_data
