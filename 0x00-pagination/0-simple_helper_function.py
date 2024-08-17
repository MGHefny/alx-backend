#!/usr/bin/env python3
"""help function"""


def index_range(page, page_size):
    """return range"""
    front = (page - 1) * page_size
    last = page * page_size
    return front, last
