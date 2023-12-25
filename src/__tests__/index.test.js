import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';
import { useAuthUser } from '@/hooks/useAuthUser';

describe('Home', () => {
	test('test render', () => {
		render(<RootLayout />);
		const user = useAuthUser();
		const form = screen.getByTestId('form-element');

		if (!user) {
			expect(form).toBeInTheDocument();
		}
	});
});
