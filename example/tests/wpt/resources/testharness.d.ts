/**
 * Enum of possible test statuses.
 */
enum TestStatus {
  PASS = 0,
  FAIL = 1,
  TIMEOUT = 2,
  NOTRUN = 3,
  PRECONDITION_FAILED = 4,
}

enum TestPhase {
  INITIAL = 0,
  STARTED = 1,
  HAS_RESULT = 2,
  CLEANING = 3,
  COMPLETE = 4,
}

interface Test {
  /** The test name. */
  name: string
  phase: TestPhase
  /** The test status code.*/
  status: TestStatus
  /** A message indicating the reason for test failure. */
  message: string | null
  index: number | null

  format_status(): string
}

/**
 * Add a callback that's triggered when the first :js:class:`Test` is created.
 *
 * @param {Function} callback - Callback function. This is called
 * without arguments.
 */
function add_start_callback(callback: () => void)

/**
 * Add a callback that's triggered when a test state changes.
 *
 * @param {Function} callback - Callback function, called with the
 * :js:class:`Test` as the only argument.
 */
function add_test_state_callback(callback: (test: Test) => void)

/**
 * Add a callback that's triggered when a test result is received.
 *
 * @param {Function} callback - Callback function, called with the
 * :js:class:`Test` as the only argument.
 */
function add_result_callback(callback: (test: Test) => void)

/**
 * Add a callback that's triggered when all tests are complete.
 *
 * @param {Function} callback - Callback function, called with an
 * array of :js:class:`Test` objects, a :js:class:`TestsStatus`
 * object and an array of :js:class:`AssertRecord` objects. If the
 * debug setting is ``false`` the final argument will be an empty
 * array.
 *
 * For performance reasons asserts are only tracked when the debug
 * setting is ``true``. In other cases the array of asserts will be
 * empty.
 */
function add_completion_callback(callback: (tests: Test[], status: TestStatus, asserts: AssertRecord[]) => void)
