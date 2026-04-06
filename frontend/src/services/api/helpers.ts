export async function mockDelay(ms = 250) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function maybeThrow(shouldThrow = false, message = "Mock API error") {
  if (shouldThrow) throw new Error(message);
}
