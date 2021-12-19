import { LyricItem } from './lyric';

export class Timer {
	private interval = 0;
	private id: any = null;
	private current = 0;
	private lyrics = [] as LyricItem[];
	private div: HTMLDivElement;
	constructor(lyric: LyricItem[], div: HTMLDivElement) {
		this.lyrics = lyric;
		this.div = div;
	}
	start() {
		// eslint-disable-next-line quotes
		while (this.lyrics[this.current].time === 0) {
			if (this.current) {
				this.lyrics[this.current - 1].unfocus();
			}
			this.lyrics[this.current].focus();
			this.current++;
			console.log('start');
		}
		this.id = setInterval(() => {
			this.interval++;
			if (this.current >= this.lyrics.length || !this.id) return;
			console.log(
				'int:' +
					this.interval +
					'; time: ' +
					this.lyrics[this.current].time
			);

			if (this.interval === this.lyrics[this.current].time) {
				if (this.current) {
					this.lyrics[this.current - 1].unfocus();
				}
				//console.log(this.current + '/' + this._lyrics.length);

				this.lyrics[this.current].focus();
				this.div.scrollTo({
					top:
						this.lyrics[this.current].pos -
						this.div.offsetHeight / 2,
					behavior: 'smooth'
				});
				this.current++;
				if (this.current === this.lyrics.length) {
					this.end();
				}
			}
		}, 1000);
	}

	stop() {
		clearInterval(this.id);
	}

	end() {
		this.lyrics[this.current]?.unfocus();
		this.lyrics[this.current - 1]?.unfocus();
		this.div.scrollTo({ top: 0, behavior: 'smooth' });
		this.current = 0;
		this.stop();
		this.interval = 0;
		this.id = null;
	}
}
