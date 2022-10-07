<script>
export default {
	name: 'headerPage',
	setup() {
		const headerBarList = [
			{
				name: '베어장터',
				key: 'SHOP',
			},
			{
				name: '커뮤니티',
				key: 'COMMUNITY',
			},
			{
				name: '캠핑정보',
				key: 'DATA',
			},
			{
				name: '게시판',
				key: 'BOARD',
			},
			{
				name: '고객센터',
				key: 'CUSTOMER',
			},
		];

		return {
			headerBarList,
		};
	},
};
</script>
<template>
	<div>
		<header class="header">
			<div class="header-bar">
				<div class="header-bar-logo">
					<h1>logo</h1>
				</div>
				<div class="header-bar-menu">
					<div class="header-bar-menu-login">
						<ul>
							<li>
								<span class="down">Download webApp</span>
								<span><i class="fa-solid fa-download"></i></span>
							</li>
							<li>
								<a>로그인</a>
							</li>
							<li>
								<a> 회원가입 </a>
							</li>
							<li>
								<a> 마이페이지 </a>
							</li>
						</ul>
					</div>
					<div class="header-bar-menu-info">
						<nav class="header-bar-menu-info-list">
							<span v-for="item in headerBarList">{{ item.name }}</span>
						</nav>
						<div class="header-bar-menu-info-search">
							<input type="text" />
							<i class="fa-solid fa-magnifying-glass"></i>
						</div>
					</div>
				</div>
			</div>
		</header>
	</div>
</template>
