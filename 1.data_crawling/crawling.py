#%%
from icrawler.builtin import GoogleImageCrawler

keys = ['문과 교수', '자연대 교수', '공대 교수', "음대 교수", "의대 교수", "법대 교수", "체대 교수"]

for keyword in keys:
    google_crawler = GoogleImageCrawler(
        feeder_threads=1,
        parser_threads=2,
        downloader_threads=4,
        storage={'root_dir': f'download/{keyword}'})
    filters = dict(
        size='large',
        type='face')
    google_crawler.crawl(keyword=keyword, filters=filters, max_num=200, file_idx_offset=0)