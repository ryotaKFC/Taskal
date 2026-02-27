import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
			<a href="/" className="text-xl font-bold">
				Taskal
			</a>
			<Button asChild>
				<a href="/auth/login">ログイン</a>
			</Button>
		</header>
	);
}
