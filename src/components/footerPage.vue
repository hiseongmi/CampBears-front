<script>
export default {
	name: 'footerPage',
	setup() {
		const footerMenu = [
			{
				name: '회사소개',
				key: 'INTRO',
			},
			{
				name: '인재채용',
				key: 'TAKE',
			},
			{
				name: '제휴제안',
				key: 'PROPOSAL',
			},
			{
				name: '이용약관',
				key: 'TERMS',
			},
			{
				name: '개인정보처리방침',
				key: 'PERSONAL',
			},
			{
				name: '청소년보호정책',
				key: 'POLICY',
			},
			{
				name: '베어스 고객센터',
				key: 'SERVICE',
				style: { borderRight: 'none' },
			},
		];

		return {
			footerMenu,
		};
	},
};
</script>
<template>
	<div>
		<footer class="footer">
			<div class="footer-bar">
				<div class="footer-bar-wrap">
					<nav class="footer-bar-wrap-nav">
						<span class="footer-bar-wrap-nav-menu" v-for="item in footerMenu">{{ item.name }}</span>
					</nav>
				</div>
				<div class="footer-bar-info">
					<div class="footer-bar-info-logo">
						<span class="footer-bar-info-logo-img">logo</span>
						<span>Bears 주식회사</span>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>
